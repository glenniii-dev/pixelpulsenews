import { pgTable, varchar, boolean, timestamp, uuid, text, integer } from "drizzle-orm/pg-core";

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
  order: integer("order").notNull().default(0),
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
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Research Table
export const research = pgTable("research", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: varchar("date").notNull(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull(),
  category: varchar("category").notNull().default("All"),
  bio: text("bio").notNull(),
  content: text("content").notNull(),
  references: text("references").notNull().default(""),
  isPublished: boolean("isPublished").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Resources Table
export const resources = pgTable("resources", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull(),
  content: text("content").notNull(),
  isPublished: boolean("isPublished").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Team Table
export const team = pgTable("team", {
  id: uuid("id").defaultRandom().primaryKey(),
  image: varchar("image").notNull().default(""),
  name: varchar("name").notNull(),
  role: varchar("role").notNull(),
  bio: text("bio").notNull().default(""),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// STEM Opportunities Table
export const opportunities = pgTable("opportunities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  date: varchar("date").notNull(),
  location: varchar("location").notNull(),
  isPublished: boolean("isPublished").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});