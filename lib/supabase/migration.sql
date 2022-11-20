
CREATE SEQUENCE IF NOT EXISTS groups_id_seq;
CREATE TABLE "groups" (
  "id" int8 NOT NULL DEFAULT nextval('groups_id_seq'::regclass),
  "line_group_id" varchar(50) NOT NULL,
  "name"  varchar(50) NOT NULL,
  "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(0),
  PRIMARY KEY ("id")
);
CREATE INDEX "groups_line_group_id" ON "groups" ("line_group_id");

CREATE SEQUENCE IF NOT EXISTS line_users_id_seq;
CREATE TABLE "line_users" (
  "id" int8 NOT NULL DEFAULT nextval('line_users_id_seq'::regclass),
  "name"  varchar(50) NOT NULL,
  "group_id" int8,
  "line_user_id" varchar(50) NOT NULL,
  "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(0),
  CONSTRAINT "line_group_id_foreign" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE,
  PRIMARY KEY ("id")
);
CREATE INDEX "users_line_user_id" ON "line_users" ("line_user_id");

CREATE SEQUENCE IF NOT EXISTS teams_id_seq;
CREATE TABLE "teams" (
  "id" int8 NOT NULL DEFAULT nextval('teams_id_seq'::regclass),
  "image" varchar(50) NOT NULL,
  "name"  varchar(50) NOT NULL,
  "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(0),
  PRIMARY KEY ("id")
);
CREATE INDEX "teams_name" ON "teams" ("name");

CREATE SEQUENCE IF NOT EXISTS match_id_seq;
CREATE TABLE "match" (
  "id" int8 NOT NULL DEFAULT nextval('match_id_seq'::regclass),
  "team_home_id" int8,
  "team_visitor_id" int8,
  "date_time_kickoff" timestamp(0),
  "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(0),
  CONSTRAINT "line_team_home_id_foreign" FOREIGN KEY ("team_home_id") REFERENCES "teams"("id") ON DELETE CASCADE,
  CONSTRAINT "line_team_visitor_id_foreign" FOREIGN KEY ("team_visitor_id") REFERENCES "teams"("id") ON DELETE CASCADE,
  PRIMARY KEY ("id")
);

CREATE SEQUENCE IF NOT EXISTS joiner_id_seq;
CREATE TABLE "joiner" (
  "id" int8 NOT NULL DEFAULT nextval('joiner_id_seq'::regclass),
  "line_user_id" int8,
  "group_id" int8,
  "team_winner_id" int8,
  "point" int8,
  "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(0),
  CONSTRAINT "joiner_line_user_id_foreign" FOREIGN KEY ("line_user_id") REFERENCES "line_users"("id") ON DELETE CASCADE,
  CONSTRAINT "joiner_group_id_foreign" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE,
  CONSTRAINT "joiner_team_winner_id_foreign" FOREIGN KEY ("team_winner_id") REFERENCES "teams"("id") ON DELETE CASCADE,
  PRIMARY KEY ("id")
)