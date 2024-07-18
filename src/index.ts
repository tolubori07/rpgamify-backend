import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { sign, decode, verify } from 'jsonwebtoken'
import { checkUser, createUser, getUser, getUserById } from "./db/queries";
import { bearer } from '@elysiajs/bearer'
import swagger from "@elysiajs/swagger";
const app = new Elysia()
app.use(cors())

const generateToken = (id: number) => {
  return sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}
app.use(bearer())

app.use(swagger())

app.post('/api/signup', async ({ body, set }: any) => {
  //fetch user info from body, throw error if all fields not complete
  const { username, email, password, age } = body;
  if (!username || !email || !password || !age) {
    set.status = 400
    throw new Error("Please fill out all fields")
  }

  //check if user exists
  const userExists = await checkUser(email)
  if (userExists) {
    set.status = 400;
    throw new Error("This user already exists")
  }
  //hash password using bun's inbuilt function
  const hashedPassword = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 4,
  })
  await createUser({ username: username, email: email, password: hashedPassword, age: age })
  const result = await getUser(email)
  const user = result[0]
  set.status = 201
  return {
    token: generateToken(user.id),
  }
})


app.post('/login', async ({ body, set }: any) => {
  const { email, password } = body
  const result = await getUser(email)
  const user = result[0]
  const isMatch: boolean = await Bun.password.verify(password, user.password)
  if (isMatch === true) {
    set.status = 200;
    return {
      token: generateToken(user.id),
      id: user.id,
      username: user.username,
      health: user.health,
      gold: user.gold,
      exp: user.exp,
      max_exp: user.max_exp,
      level: user.level,
      energy: user.energy,
      max_energy: user.max_energy,
      class: user.class,
    }
  } else {
    set.status = 403
    throw new Error("Passwords do not match")
  }
})



app.guard(
  {},
  (app) =>
    app
      //@ts-ignore
      .resolve(async ({ set, headers }: any) => {
        const auth = headers['authorization'];
        const bearer: string | null = auth?.startsWith('Bearer ') ? auth.split(" ")[1] : null
        if (bearer) {
          try {
            const decoded = verify(bearer, process.env.JWT_SECRET);
            const res = await getUserById(decoded.id)
            const user = res[0]
            return { user }
          } catch (err) {
            console.error(err)
          }
        } else {
          set.status = 401
          throw new Error("Unauthorise: token not provided")
        }
      }
      )
      .get('/getUser', async ({ user }: {}) => {
        return {
          //@ts-ignore
          id: user.id,
          username: user.username,
          health: user.health,
          gold: user.gold,
          exp: user.exp,
          max_exp: user.max_exp,
          level: user.level
        }
      })
)


app.listen(3000)
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

