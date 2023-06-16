
import { drizzle } from 'drizzle-orm/node-postgres';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { InferModel, eq, sql } from 'drizzle-orm';
import { Pool } from 'pg';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
  cityId: integer('city_id').references((cities) => cities.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferModel<typeof users>;
