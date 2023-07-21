import Sequelize from "sequelize";

const sequelize = new Sequelize('postgres://santiago:fHJKqUgtPT8L81vVB7vIELscn5YtC73k@dpg-citcco95rnuhcnsuviv0-a.oregon-postgres.render.com/fruver_sac_vip4', {
    // host: "https://www.db4free.net/confirm.php?create=9583c6afa8b9fe5a9978cb7b19417fa3",
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Para que funcione con db4free.net, que usa un certificado autofirmado
      }
    }
});

export {
    sequelize
};


