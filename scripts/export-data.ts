import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function exportAll() {
  const models = ['Company', 'User', 'SalesRep', 'Contact', 'Lead', 'LeadNote', 'AssignmentRule', 'WebhookLog'];
  let sql = "";

const modelToTable: Record<string, string> = {
    Company: 'companies',
    User: 'users',
    SalesRep: 'sales_reps',
    Contact: 'contacts',
    Lead: 'leads',
    LeadNote: 'lead_notes',
    AssignmentRule: 'assignment_rules',
    WebhookLog: 'webhook_logs'
  };

  for (const model of models) {
    const tableName = modelToTable[model];
    const data = await (prisma as any)[model.charAt(0).toLowerCase() + model.slice(1)].findMany();
    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      sql += `-- Data for ${model} (Table: ${tableName})\n`;
      for (const row of data) {
        const values = columns.map(col => {
          const val = row[col];
          if (val === null) return "NULL";
          if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
          if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`; // MySQL datetime format
          if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
          return val;
        });
        sql += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
      }
      sql += "\n";
    }
  }

  fs.writeFileSync('database_dump.sql', sql);
  console.log("Database dump created: database_dump.sql");
}

exportAll()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
