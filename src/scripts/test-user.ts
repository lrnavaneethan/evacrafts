import 'dotenv/config'
import { prisma } from "../../lib/prisma";

async function main(){
    const user = await prisma.user.create({
          data: { name: 'Eva', email: 'eva@evacrafts.com', googleId: '123' }
    })
      console.log(user);

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });