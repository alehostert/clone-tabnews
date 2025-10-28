exports.up = (pgm) => {
  pgm.createTable("sessions", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    token: {
      type: "varchar(96)",
      notNull: true,
      unique: true,
    },

    user_id: {
      type: "uuid",
      notNull: true,
    },

    // Why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('uct', now())"),
    },

    expires_at: {
      type: "timestamptz",
      notNull: true,
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('uct', now())"),
    },
  });
};

exports.down = false;
