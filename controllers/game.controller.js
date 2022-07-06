const { Room } = require('../models');
const { Game } = require('../models');


// ROUTE ROOM & FIGHT
const createRoom = async (req, res) => {
    console.log("masuk sini");
    console.log(req.user.dataValues.id);
    console.log(req.body.name);

    await Room.create({
            name: req.body.name,
            creator_id: req.user.dataValues.id
        })
        .then((room) => {
            res.status(200).json({
                message: "room was created succesfully",
                room_id: room.id
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "create room failed",
                error : error.message
            })
        })
};

const updateRoom = async (req, res, data) => {

    const id = req.user.dataValues.id;
    let player1_id = data.player1_id;
    let player2_id = data.player2_id;
    let roomid = req.params.id;
    let payload_update;


    // kalo room full, check apakah username adalah anggota room
    if (player1_id && player2_id) {
        if (player1_id == id || player2_id == id)
            return Promise.resolve("already assigned, start the game");
        else
            return Promise.resolve("room full, find other room");
    } else {
        if (player1_id == id || player2_id == id)
            return Promise.resolve("already assigned, start the game");
        else {
            // kalo player1 kosong
            if (!player1_id) {
                player1_id = id;
                payload_update = {
                    player1_id: id
                }
            }
            //kalo player2 kosong
            else {
                player2_id = id;
                payload_update = {
                    player2_id: id
                }
            }

            // update database
            return await Room.update(payload_update, {
                    where: {
                        id: roomid
                    }
                }, {
                    include: Game
                })
                .then((data) => {
                    console.log('inside room update OK')
                    console.log(data)

                    // create game kosong
                    const crtGame = Game.create({
                        roomid: roomid,
                        player1: "",
                        player2: ""
                    });

                    return Promise.resolve("assigned in this room, you can start the game")
                })
                .catch((error) => {
                    console.log('inside room update ERR')
                    console.log(error)
                    return Promise.reject(error)
                })
        }
    }
};

const joinRoom = async (req, res) => {
    const roomid = req.params.id;
    const id = req.user.dataValues.id;

    const cariRoom = await findRoom(roomid)
        .then((data) => {

            //if find room OK, go to update room
            const updtRoom = updateRoom(req, res, data)
                .then((data) => {
                    console.log('inside updtRoom')
                    console.log(data);
                    res.status(200).json(data);
                })
                .catch((err) => {
                    console.log('inside error updt')
                    res.status(200).json(err.message);
                })
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
};

const findRoom = async (roomid) => {
    return await Room.findByPk(roomid, {
            include: Game
        })
        .then((data) => {
            console.log(data.dataValues)
            return Promise.resolve(data.dataValues);
        })
        .catch((err) => {
            return Promise.reject(err.message);
        })
};

const checkRoom = async (req, res, data) => {
    // OUTPUT = ADA LAWAN, AUTHORIZED ?
    // INPUT DATA(ROOM+GAMES) DARI FINDROOM
    const id = req.user.dataValues.id;
    let player1_id = data.player1_id;
    let player2_id = data.player2_id;
    let roomid = data.Games[0].dataValues.roomid;
    let authorized;
    let asPlayer;
    const choose = req.body.pick;

    let ply1 = data.Games[0].dataValues.player1;
    let ply2 = data.Games[0].dataValues.player2;

    if (!ply1) ply1 = "";
    if (!ply2) ply2 = "";


    let pjgPly1 = ply1.length;
    let pjgPly2 = ply2.length;
    let stat1, stat2;

    if (player1_id && player2_id)
        adaLawan = true
    else
        adaLawan = false

    if (player1_id == id || player2_id == id) {
        authorized = true
        if (player1_id == id) asPlayer = 1;
        else asPlayer = 2;
    } else {
        authorized = false
        console.log('authorized failed')
        return Promise.reject("wrong room, please join other room / create new room")
    }

    // update data db jika length char < 4
    if (asPlayer == 1) {
        if (pjgPly1 >= 6) {
            let r1 = ply1.split('-');
            let r2 = ply2.split('-');
            let p1 = 0;
            let lastP1 = 0;

            for (x = 0; x <= 2; x++) {
                if (r1[x] === 'B') {
                    if (r2[x] === 'K') p1 = -1;
                    else if (r2[x] === 'G') p1 = 1
                    else p1 = 0
                } else if (r1[x] === 'K') {
                    if (r2[x] === 'B') p1 = 1;
                    else if (r2[x] === 'G') p1 = -1
                    else p1 = 0
                } else {
                    if (r2[x] === 'B') p1 = -1;
                    else if (r2[x] === 'K') p1 = 1
                    else p1 = 0
                }
                lastP1 += p1;
                console.log("putaran " + x + " " + p1)
            }
            console.log(lastP1)
            if (lastP1>0)
                stat1 = "WON"
            else if (lastP1 == 0)
                stat1 = "DRAW"
            else stat1 = "LOSE"

            await Game.update({
                sp1 : lastP1,
                result1 : stat1
            }, {
                where : {
                    roomid : roomid
                }
            })

            let pjg1 = ply1.length/2;

            
            const payload_msg = {
                round : pjg1,
                chance_left : 3 - pjg1,
                pick_record_1 : { yours : ply1.split('-')[0], opponent : ply2.split('-')[0]},
                pick_record_2 : { yours : ply1.split('-')[1], opponent : ply2.split('-')[1]},
                pick_record_3 : { yours : ply1.split('-')[2], opponent : ply2.split('-')[2]},
                final_result : stat1,
                your_score : lastP1
            }

            return Promise.resolve({ 
                status : "ROUND COMPLETED",
                record : payload_msg
            });

        } else {
            ply1 += choose + "-";
            console.log("ply1" + ply1)
            await Game.update({
                player1: ply1
            }, {
                where: {
                    roomid: roomid
                }
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err)
            })

            let pjg1 = ply1.length/2;
            let payload_msg;

            if (pjg1 == 3) {
                payload_msg = {
                    round : pjg1,
                    chance_left : 3 - pjg1,
                    pick_record_1 : { yours : ply1.split('-')[0], opponent : ply2.split('-')[0]},
                    pick_record_2 : { yours : ply1.split('-')[1], opponent : ply2.split('-')[1]},
                    pick_record_3 : { yours : ply1.split('-')[2], opponent : ply2.split('-')[2]},
                    note : "PLEASE HIT 'SEND' BUTTON ON YOU POSTMAN TO UPDATE THE STATUS"
                }
            } else {
                payload_msg = {
                    round : pjg1,
                    chance_left : 3 - pjg1,
                    pick_record_1 : { yours : ply1.split('-')[0], opponent : ply2.split('-')[0]},
                    pick_record_2 : { yours : ply1.split('-')[1], opponent : ply2.split('-')[1]},
                    pick_record_3 : { yours : ply1.split('-')[2], opponent : ply2.split('-')[2]},
                }
            }

            return Promise.resolve(payload_msg);
        }
    } else if (asPlayer == 2) {
        if (pjgPly2 >= 6) {
            let r1 = ply1.split('-');
            let r2 = ply2.split('-');
            let p2 = 0;
            let lastP2 =0;

            for (x = 0; x <= 2; x++) {
                if (r2[x] === 'B') {
                    if (r1[x] === 'K') p2 = -1;
                    else if (r1[x] === 'G') p2 = 1
                    else p2 = 0
                } else if (r2[x] === 'K') {
                    if (r1[x] === 'B') p2 = 1;
                    else if (r1[x] === 'G') p2 = -1
                    else p2 = 0
                } else {
                    if (r1[x] === 'B') p2 = -1;
                    else if (r1[x] === 'K') p2 = 1
                    else p2 = 0
                }
                
                lastP2 += p2;

                console.log("putaran " + x + " " + p2)
                
            }
            console.log(lastP2)
            if (lastP2>0)
                stat2 = "WON"
            else if (lastP2 == 0)
                stat2 = "DRAW"
            else stat2 = "LOSE"

            await Game.update({
                sp2 : lastP2,
                result2 : stat2
            }, {
                where : {
                    roomid : roomid
                }
            })

            let pjg2 = ply2.length/2;
            const payload_msg = {
                round : pjg2,
                chance_left : 3 - pjg2,
                pick_record_1 : { yours : ply2.split('-')[0], opponent : ply1.split('-')[0]},
                pick_record_2 : { yours : ply2.split('-')[1], opponent : ply1.split('-')[1]},
                pick_record_3 : { yours : ply2.split('-')[2], opponent : ply1.split('-')[2]},
                final_result : stat2,
                your_score : lastP2
            }

            return Promise.resolve({ 
                status : "ROUND COMPLETED",
                record : payload_msg
            });
        } else {
            ply2 += choose + "-";
            console.log("ply2" + ply2)
            await Game.update({
                player2: ply2
            }, {
                where: {
                    roomid: roomid
                }
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err)
            })

            let pjg2 = ply2.length/2;
            let payload_msg;

            if (pjg2 == 3){
                payload_msg = {
                    round : pjg2,
                    chance_left : 3 - pjg2,
                    pick_record_1 : { yours : ply2.split('-')[0], opponent : ply1.split('-')[0]},
                    pick_record_2 : { yours : ply2.split('-')[1], opponent : ply1.split('-')[1]},
                    pick_record_3 : { yours : ply2.split('-')[2], opponent : ply1.split('-')[2]},
                    note : "PLEASE HIT 'SEND' BUTTON ON YOU POSTMAN TO UPDATE THE STATUS"
                }
            } else {
                payload_msg = {
                    round : pjg2,
                    chance_left : 3 - pjg2,
                    pick_record_1 : { yours : ply2.split('-')[0], opponent : ply1.split('-')[0]},
                    pick_record_2 : { yours : ply2.split('-')[1], opponent : ply1.split('-')[1]},
                    pick_record_3 : { yours : ply2.split('-')[2], opponent : ply1.split('-')[2]},
                }
            }

            return Promise.resolve(payload_msg);
        }
    }
};
const playGame = async (req, res) => {

    const roomid = req.params.id;

    // GET ROOM & GAME BASED ON ROOMID
    const cariRoom = await findRoom(roomid)
        .then((data) => {
            const chkRoom = checkRoom(req, res, data)
                .then((data) => {
                    console.log(data);
                    res.status(200).json(data);
                })
                .catch((err) => {
                    res.status(200).json(err.message);
                })
        })
        .catch((err) => {
            res.status(200).json(err.message);
        })
};

const playProgress = () => {
    // check array length
    let panjangPly2 = Game.findAll({where : {
        roomid : roomid
    }}).then((data) => {
        return data.player2
    }).catch((err) => {
        return Promise.reject("check data lawan error " + err.message)
    })
}
module.exports = {
    createRoom,
    joinRoom,
    playGame,
};