A. Pengaturan awal

1. Install modul npm Install
2. Buat database sequelize db:create
3. Buat migrasi sequelize db:migrate
4. Masukkan seeder sequelize db:seed:all

B. API untuk Register Login Game

1. Register POST /api/v1/auth/register
2. Login (user/ super user) POST /api/v1/auth/login
3. Create room POST /api/v1/auth/create-room
4. Join Room POST /api/v1/join-room/:roomid
5. Main Game POST /api/v1/fight/:roomid

C. SUPER USER username: admin, password: admin)

1. Lihat user GET /api/v1/users
2. Lihat data user GET /api/v1/users/:id
3. Lihat room GET /api/v1/rooms/:id
