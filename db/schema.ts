import { pgTable, varchar, boolean, timestamp, uuid, text } from "drizzle-orm/pg-core";

// Admin Table
export const admin = pgTable("admin", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username").notNull(),
  password: varchar("password").notNull(),
});

// Newsletter Table
export const newsletters = pgTable("newsletters", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: varchar("date").notNull(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull(),
  edition: text("editon").notNull(),
  content: text("content").notNull(),
  bibliography: text("bibliography").notNull().default(""),
  isPublished: boolean("isPublished").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Articles Table
export const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: varchar("date").notNull(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull(),
  submittedTo: text("submittedTo").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  bibliography: text("bibliography").notNull().default(""),
  isPublished: boolean("isPublished").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});