import bcryptjs from "bcryptjs";

function addPepper(password) {
  const pepper = process.env.PEPPER;
  return password + pepper;
}

async function hash(password) {
  const rounds = getNumberOfRounds();
  const pepperedPassword = addPepper(password);
  return await bcryptjs.hash(pepperedPassword, rounds);
}

function getNumberOfRounds() {
  let rounds = 1;
  if (process.env.NODE_ENV === "production") {
    rounds = 14;
  }

  return rounds;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(addPepper(providedPassword), storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
