import { prisma } from '../../database';

async function resetDatabase() {
    const result: {name: string}[] = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type = "table";`
        const tableNames = result.map((table: any) => table.name).filter((name: string) => !name.startsWith('_'))
        async function main() {
            for (const tableName of tableNames) 
            await prisma.$queryRawUnsafe(
                `DELETE FROM ${tableName};`
              );
          }

        await main();
}

export { resetDatabase };