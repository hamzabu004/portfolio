import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_links_kind" AS ENUM('demo', 'code', 'paper', 'video', 'article', 'other');
  CREATE TYPE "public"."enum_projects_blocks_gallery_columns" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_projects_blocks_chart_kind" AS ENUM('bar', 'line');
  CREATE TYPE "public"."enum_projects_categories" AS ENUM('iot', 'ai', 'cv', 'web', 'hpc', 'automation', 'research');
  CREATE TYPE "public"."enum_projects_stage" AS ENUM('in-progress', 'complete');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_links_kind" AS ENUM('demo', 'code', 'paper', 'video', 'article', 'other');
  CREATE TYPE "public"."enum__projects_v_blocks_gallery_columns" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum__projects_v_blocks_chart_kind" AS ENUM('bar', 'line');
  CREATE TYPE "public"."enum__projects_v_version_categories" AS ENUM('iot', 'ai', 'cv', 'web', 'hpc', 'automation', 'research');
  CREATE TYPE "public"."enum__projects_v_version_stage" AS ENUM('in-progress', 'complete');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_experience_kind" AS ENUM('job', 'internship', 'research', 'freelance', 'teaching', 'education');
  CREATE TYPE "public"."enum_publications_links_kind" AS ENUM('demo', 'code', 'paper', 'video', 'article', 'other');
  CREATE TYPE "public"."enum_publications_status" AS ENUM('published', 'accepted', 'submitted', 'preprint');
  CREATE TYPE "public"."enum_activities_kind" AS ENUM('award', 'competition', 'volunteering', 'talk', 'other');
  CREATE TYPE "public"."enum_posts_blocks_gallery_columns" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_posts_blocks_chart_kind" AS ENUM('bar', 'line');
  CREATE TYPE "public"."enum_posts_kind" AS ENUM('blog', 'note', 'photo-essay');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_columns" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum__posts_v_blocks_chart_kind" AS ENUM('bar', 'line');
  CREATE TYPE "public"."enum__posts_v_version_kind" AS ENUM('blog', 'note', 'photo-essay');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "projects_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"kind" "enum_projects_links_kind" DEFAULT 'other',
  	"url" varchar
  );
  
  CREATE TABLE "projects_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_projects_blocks_gallery_columns" DEFAULT '1',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"file_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "projects_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight" boolean
  );
  
  CREATE TABLE "projects_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_chart_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"x" varchar
  );
  
  CREATE TABLE "projects_blocks_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"kind" "enum_projects_blocks_chart_kind" DEFAULT 'bar',
  	"x_label" varchar,
  	"y_label" varchar,
  	"unit" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar DEFAULT 'python',
  	"code" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_hardware_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"quantity" numeric,
  	"role" varchar
  );
  
  CREATE TABLE "projects_blocks_hardware" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Hardware',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"height" numeric DEFAULT 520,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_projects_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"cover_id" integer,
  	"slug" varchar,
  	"context" varchar,
  	"period" varchar,
  	"stage" "enum_projects_stage" DEFAULT 'complete',
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_numbers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"kind" "enum__projects_v_version_links_kind" DEFAULT 'other',
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__projects_v_blocks_gallery_columns" DEFAULT '1',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"file_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"highlight" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_chart_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"x" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"kind" "enum__projects_v_blocks_chart_kind" DEFAULT 'bar',
  	"x_label" varchar,
  	"y_label" varchar,
  	"unit" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" varchar DEFAULT 'python',
  	"code" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hardware_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"quantity" numeric,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hardware" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Hardware',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"height" numeric DEFAULT 520,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_version_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__projects_v_version_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_cover_id" integer,
  	"version_slug" varchar,
  	"version_context" varchar,
  	"version_period" varchar,
  	"version_stage" "enum__projects_v_version_stage" DEFAULT 'complete',
  	"version_featured" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_projects_v_numbers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "experience_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"organization" varchar NOT NULL,
  	"period" varchar NOT NULL,
  	"location" varchar,
  	"url" varchar,
  	"kind" "enum_experience_kind" DEFAULT 'job' NOT NULL,
  	"logo_id" integer,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experience_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "publications_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"kind" "enum_publications_links_kind" DEFAULT 'other',
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"authors" varchar,
  	"venue" varchar,
  	"year" varchar,
  	"status" "enum_publications_status" DEFAULT 'published',
  	"tldr" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"kind" "enum_activities_kind" DEFAULT 'competition' NOT NULL,
  	"year" varchar,
  	"url" varchar,
  	"description" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "posts_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_posts_blocks_gallery_columns" DEFAULT '1',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"file_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "posts_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight" boolean
  );
  
  CREATE TABLE "posts_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_chart_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"x" varchar
  );
  
  CREATE TABLE "posts_blocks_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"kind" "enum_posts_blocks_chart_kind" DEFAULT 'bar',
  	"x_label" varchar,
  	"y_label" varchar,
  	"unit" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar DEFAULT 'python',
  	"code" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_hardware_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"quantity" numeric,
  	"role" varchar
  );
  
  CREATE TABLE "posts_blocks_hardware" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Hardware',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"height" numeric DEFAULT 520,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"cover_id" integer,
  	"content" jsonb,
  	"slug" varchar,
  	"kind" "enum_posts_kind" DEFAULT 'blog',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_numbers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__posts_v_blocks_gallery_columns" DEFAULT '1',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"file_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"highlight" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_chart_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"x" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"kind" "enum__posts_v_blocks_chart_kind" DEFAULT 'bar',
  	"x_label" varchar,
  	"y_label" varchar,
  	"unit" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" varchar DEFAULT 'python',
  	"code" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hardware_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"quantity" numeric,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hardware" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Hardware',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"height" numeric DEFAULT 520,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_cover_id" integer,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_kind" "enum__posts_v_version_kind" DEFAULT 'blog',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_posts_v_numbers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "albums_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "albums" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"location" varchar,
  	"date" varchar,
  	"description" varchar,
  	"cover_id" integer,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"experience_id" integer,
  	"publications_id" integer,
  	"activities_id" integer,
  	"posts_id" integer,
  	"albums_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"headline" varchar,
  	"bio" jsonb,
  	"portrait_id" integer,
  	"resume_id" integer,
  	"email" varchar,
  	"location" varchar,
  	"projects_show" boolean DEFAULT true,
  	"projects_title" varchar DEFAULT 'Projects',
  	"projects_subtitle" varchar DEFAULT 'IoT, AI & systems',
  	"experience_show" boolean DEFAULT true,
  	"experience_title" varchar DEFAULT 'Experience',
  	"experience_subtitle" varchar DEFAULT 'Work, research & teaching',
  	"research_show" boolean DEFAULT true,
  	"research_title" varchar DEFAULT 'Research',
  	"research_subtitle" varchar DEFAULT 'Papers & manuscripts',
  	"activities_show" boolean DEFAULT true,
  	"activities_title" varchar DEFAULT 'Activities',
  	"activities_subtitle" varchar DEFAULT 'Competitions & community',
  	"writing_show" boolean DEFAULT false,
  	"writing_title" varchar DEFAULT 'Writing',
  	"writing_subtitle" varchar DEFAULT 'Notes & blog posts',
  	"photos_show" boolean DEFAULT false,
  	"photos_title" varchar DEFAULT 'Photography',
  	"photos_subtitle" varchar DEFAULT 'Places & observations',
  	"description" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects_highlights" ADD CONSTRAINT "projects_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text" ADD CONSTRAINT "projects_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_video" ADD CONSTRAINT "projects_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items" ADD CONSTRAINT "projects_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_table_rows" ADD CONSTRAINT "projects_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_table" ADD CONSTRAINT "projects_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_chart_points" ADD CONSTRAINT "projects_blocks_chart_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_chart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_chart" ADD CONSTRAINT "projects_blocks_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_code" ADD CONSTRAINT "projects_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hardware_items" ADD CONSTRAINT "projects_blocks_hardware_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hardware"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hardware" ADD CONSTRAINT "projects_blocks_hardware_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_embed" ADD CONSTRAINT "projects_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_categories" ADD CONSTRAINT "projects_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_texts" ADD CONSTRAINT "projects_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_numbers" ADD CONSTRAINT "projects_numbers_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_highlights" ADD CONSTRAINT "_projects_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text" ADD CONSTRAINT "_projects_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_video" ADD CONSTRAINT "_projects_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items" ADD CONSTRAINT "_projects_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats" ADD CONSTRAINT "_projects_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_table_rows" ADD CONSTRAINT "_projects_v_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_table" ADD CONSTRAINT "_projects_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_chart_points" ADD CONSTRAINT "_projects_v_blocks_chart_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_chart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_chart" ADD CONSTRAINT "_projects_v_blocks_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_code" ADD CONSTRAINT "_projects_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hardware_items" ADD CONSTRAINT "_projects_v_blocks_hardware_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hardware"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hardware" ADD CONSTRAINT "_projects_v_blocks_hardware_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_embed" ADD CONSTRAINT "_projects_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_categories" ADD CONSTRAINT "_projects_v_version_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_texts" ADD CONSTRAINT "_projects_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_numbers" ADD CONSTRAINT "_projects_v_numbers_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_bullets" ADD CONSTRAINT "experience_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience" ADD CONSTRAINT "experience_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experience_rels" ADD CONSTRAINT "experience_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_rels" ADD CONSTRAINT "experience_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_links" ADD CONSTRAINT "publications_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_text" ADD CONSTRAINT "posts_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_images" ADD CONSTRAINT "posts_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_images" ADD CONSTRAINT "posts_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery" ADD CONSTRAINT "posts_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_video" ADD CONSTRAINT "posts_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_video" ADD CONSTRAINT "posts_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_items" ADD CONSTRAINT "posts_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats" ADD CONSTRAINT "posts_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_table_rows" ADD CONSTRAINT "posts_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_table" ADD CONSTRAINT "posts_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_chart_points" ADD CONSTRAINT "posts_blocks_chart_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_chart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_chart" ADD CONSTRAINT "posts_blocks_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_code" ADD CONSTRAINT "posts_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hardware_items" ADD CONSTRAINT "posts_blocks_hardware_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hardware"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hardware" ADD CONSTRAINT "posts_blocks_hardware_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_embed" ADD CONSTRAINT "posts_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_numbers" ADD CONSTRAINT "posts_numbers_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_text" ADD CONSTRAINT "_posts_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_images" ADD CONSTRAINT "_posts_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_images" ADD CONSTRAINT "_posts_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery" ADD CONSTRAINT "_posts_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video" ADD CONSTRAINT "_posts_v_blocks_video_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video" ADD CONSTRAINT "_posts_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_items" ADD CONSTRAINT "_posts_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats" ADD CONSTRAINT "_posts_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_table_rows" ADD CONSTRAINT "_posts_v_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_table" ADD CONSTRAINT "_posts_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_chart_points" ADD CONSTRAINT "_posts_v_blocks_chart_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_chart"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_chart" ADD CONSTRAINT "_posts_v_blocks_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_code" ADD CONSTRAINT "_posts_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hardware_items" ADD CONSTRAINT "_posts_v_blocks_hardware_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hardware"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hardware" ADD CONSTRAINT "_posts_v_blocks_hardware_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_embed" ADD CONSTRAINT "_posts_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_texts" ADD CONSTRAINT "_posts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_numbers" ADD CONSTRAINT "_posts_v_numbers_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_photos" ADD CONSTRAINT "albums_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "albums_photos" ADD CONSTRAINT "albums_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums" ADD CONSTRAINT "albums_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experience_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_albums_fk" FOREIGN KEY ("albums_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_resume_id_media_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_highlights_order_idx" ON "projects_highlights" USING btree ("_order");
  CREATE INDEX "projects_highlights_parent_id_idx" ON "projects_highlights" USING btree ("_parent_id");
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_order_idx" ON "projects_blocks_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_parent_id_idx" ON "projects_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_path_idx" ON "projects_blocks_text" USING btree ("_path");
  CREATE INDEX "projects_blocks_gallery_images_order_idx" ON "projects_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_images_parent_id_idx" ON "projects_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_image_idx" ON "projects_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_video_order_idx" ON "projects_blocks_video" USING btree ("_order");
  CREATE INDEX "projects_blocks_video_parent_id_idx" ON "projects_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_video_path_idx" ON "projects_blocks_video" USING btree ("_path");
  CREATE INDEX "projects_blocks_video_file_idx" ON "projects_blocks_video" USING btree ("file_id");
  CREATE INDEX "projects_blocks_stats_items_order_idx" ON "projects_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_items_parent_id_idx" ON "projects_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_order_idx" ON "projects_blocks_stats" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_path_idx" ON "projects_blocks_stats" USING btree ("_path");
  CREATE INDEX "projects_blocks_table_rows_order_idx" ON "projects_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "projects_blocks_table_rows_parent_id_idx" ON "projects_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_table_order_idx" ON "projects_blocks_table" USING btree ("_order");
  CREATE INDEX "projects_blocks_table_parent_id_idx" ON "projects_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_table_path_idx" ON "projects_blocks_table" USING btree ("_path");
  CREATE INDEX "projects_blocks_chart_points_order_idx" ON "projects_blocks_chart_points" USING btree ("_order");
  CREATE INDEX "projects_blocks_chart_points_parent_id_idx" ON "projects_blocks_chart_points" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_chart_order_idx" ON "projects_blocks_chart" USING btree ("_order");
  CREATE INDEX "projects_blocks_chart_parent_id_idx" ON "projects_blocks_chart" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_chart_path_idx" ON "projects_blocks_chart" USING btree ("_path");
  CREATE INDEX "projects_blocks_code_order_idx" ON "projects_blocks_code" USING btree ("_order");
  CREATE INDEX "projects_blocks_code_parent_id_idx" ON "projects_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_code_path_idx" ON "projects_blocks_code" USING btree ("_path");
  CREATE INDEX "projects_blocks_hardware_items_order_idx" ON "projects_blocks_hardware_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_hardware_items_parent_id_idx" ON "projects_blocks_hardware_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hardware_order_idx" ON "projects_blocks_hardware" USING btree ("_order");
  CREATE INDEX "projects_blocks_hardware_parent_id_idx" ON "projects_blocks_hardware" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hardware_path_idx" ON "projects_blocks_hardware" USING btree ("_path");
  CREATE INDEX "projects_blocks_embed_order_idx" ON "projects_blocks_embed" USING btree ("_order");
  CREATE INDEX "projects_blocks_embed_parent_id_idx" ON "projects_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_embed_path_idx" ON "projects_blocks_embed" USING btree ("_path");
  CREATE INDEX "projects_categories_order_idx" ON "projects_categories" USING btree ("order");
  CREATE INDEX "projects_categories_parent_idx" ON "projects_categories" USING btree ("parent_id");
  CREATE INDEX "projects_cover_idx" ON "projects" USING btree ("cover_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_texts_order_parent" ON "projects_texts" USING btree ("order","parent_id");
  CREATE INDEX "projects_numbers_order_parent_idx" ON "projects_numbers" USING btree ("order","parent_id");
  CREATE INDEX "_projects_v_version_highlights_order_idx" ON "_projects_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_projects_v_version_highlights_parent_id_idx" ON "_projects_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_links_order_idx" ON "_projects_v_version_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_links_parent_id_idx" ON "_projects_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_order_idx" ON "_projects_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_text_parent_id_idx" ON "_projects_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_path_idx" ON "_projects_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_gallery_images_order_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_images_parent_id_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_image_idx" ON "_projects_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_video_order_idx" ON "_projects_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_video_parent_id_idx" ON "_projects_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_video_path_idx" ON "_projects_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_video_file_idx" ON "_projects_v_blocks_video" USING btree ("file_id");
  CREATE INDEX "_projects_v_blocks_stats_items_order_idx" ON "_projects_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_items_parent_id_idx" ON "_projects_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_order_idx" ON "_projects_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_parent_id_idx" ON "_projects_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_path_idx" ON "_projects_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_table_rows_order_idx" ON "_projects_v_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_table_rows_parent_id_idx" ON "_projects_v_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_table_order_idx" ON "_projects_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_table_parent_id_idx" ON "_projects_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_table_path_idx" ON "_projects_v_blocks_table" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_chart_points_order_idx" ON "_projects_v_blocks_chart_points" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_chart_points_parent_id_idx" ON "_projects_v_blocks_chart_points" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_chart_order_idx" ON "_projects_v_blocks_chart" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_chart_parent_id_idx" ON "_projects_v_blocks_chart" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_chart_path_idx" ON "_projects_v_blocks_chart" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_code_order_idx" ON "_projects_v_blocks_code" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_code_parent_id_idx" ON "_projects_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_code_path_idx" ON "_projects_v_blocks_code" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_hardware_items_order_idx" ON "_projects_v_blocks_hardware_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hardware_items_parent_id_idx" ON "_projects_v_blocks_hardware_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hardware_order_idx" ON "_projects_v_blocks_hardware" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hardware_parent_id_idx" ON "_projects_v_blocks_hardware" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hardware_path_idx" ON "_projects_v_blocks_hardware" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_embed_order_idx" ON "_projects_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_embed_parent_id_idx" ON "_projects_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_embed_path_idx" ON "_projects_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_projects_v_version_categories_order_idx" ON "_projects_v_version_categories" USING btree ("order");
  CREATE INDEX "_projects_v_version_categories_parent_idx" ON "_projects_v_version_categories" USING btree ("parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_cover_idx" ON "_projects_v" USING btree ("version_cover_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_texts_order_parent" ON "_projects_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_projects_v_numbers_order_parent_idx" ON "_projects_v_numbers" USING btree ("order","parent_id");
  CREATE INDEX "experience_bullets_order_idx" ON "experience_bullets" USING btree ("_order");
  CREATE INDEX "experience_bullets_parent_id_idx" ON "experience_bullets" USING btree ("_parent_id");
  CREATE INDEX "experience_logo_idx" ON "experience" USING btree ("logo_id");
  CREATE INDEX "experience_updated_at_idx" ON "experience" USING btree ("updated_at");
  CREATE INDEX "experience_created_at_idx" ON "experience" USING btree ("created_at");
  CREATE INDEX "experience_rels_order_idx" ON "experience_rels" USING btree ("order");
  CREATE INDEX "experience_rels_parent_idx" ON "experience_rels" USING btree ("parent_id");
  CREATE INDEX "experience_rels_path_idx" ON "experience_rels" USING btree ("path");
  CREATE INDEX "experience_rels_projects_id_idx" ON "experience_rels" USING btree ("projects_id");
  CREATE INDEX "publications_links_order_idx" ON "publications_links" USING btree ("_order");
  CREATE INDEX "publications_links_parent_id_idx" ON "publications_links" USING btree ("_parent_id");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE INDEX "activities_updated_at_idx" ON "activities" USING btree ("updated_at");
  CREATE INDEX "activities_created_at_idx" ON "activities" USING btree ("created_at");
  CREATE INDEX "posts_blocks_text_order_idx" ON "posts_blocks_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_text_parent_id_idx" ON "posts_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_text_path_idx" ON "posts_blocks_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_gallery_images_order_idx" ON "posts_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_images_parent_id_idx" ON "posts_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_images_image_idx" ON "posts_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "posts_blocks_gallery_order_idx" ON "posts_blocks_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_parent_id_idx" ON "posts_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_path_idx" ON "posts_blocks_gallery" USING btree ("_path");
  CREATE INDEX "posts_blocks_video_order_idx" ON "posts_blocks_video" USING btree ("_order");
  CREATE INDEX "posts_blocks_video_parent_id_idx" ON "posts_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_video_path_idx" ON "posts_blocks_video" USING btree ("_path");
  CREATE INDEX "posts_blocks_video_file_idx" ON "posts_blocks_video" USING btree ("file_id");
  CREATE INDEX "posts_blocks_stats_items_order_idx" ON "posts_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_items_parent_id_idx" ON "posts_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_order_idx" ON "posts_blocks_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_parent_id_idx" ON "posts_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_path_idx" ON "posts_blocks_stats" USING btree ("_path");
  CREATE INDEX "posts_blocks_table_rows_order_idx" ON "posts_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "posts_blocks_table_rows_parent_id_idx" ON "posts_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_table_order_idx" ON "posts_blocks_table" USING btree ("_order");
  CREATE INDEX "posts_blocks_table_parent_id_idx" ON "posts_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_table_path_idx" ON "posts_blocks_table" USING btree ("_path");
  CREATE INDEX "posts_blocks_chart_points_order_idx" ON "posts_blocks_chart_points" USING btree ("_order");
  CREATE INDEX "posts_blocks_chart_points_parent_id_idx" ON "posts_blocks_chart_points" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_chart_order_idx" ON "posts_blocks_chart" USING btree ("_order");
  CREATE INDEX "posts_blocks_chart_parent_id_idx" ON "posts_blocks_chart" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_chart_path_idx" ON "posts_blocks_chart" USING btree ("_path");
  CREATE INDEX "posts_blocks_code_order_idx" ON "posts_blocks_code" USING btree ("_order");
  CREATE INDEX "posts_blocks_code_parent_id_idx" ON "posts_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_code_path_idx" ON "posts_blocks_code" USING btree ("_path");
  CREATE INDEX "posts_blocks_hardware_items_order_idx" ON "posts_blocks_hardware_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_hardware_items_parent_id_idx" ON "posts_blocks_hardware_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hardware_order_idx" ON "posts_blocks_hardware" USING btree ("_order");
  CREATE INDEX "posts_blocks_hardware_parent_id_idx" ON "posts_blocks_hardware" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hardware_path_idx" ON "posts_blocks_hardware" USING btree ("_path");
  CREATE INDEX "posts_blocks_embed_order_idx" ON "posts_blocks_embed" USING btree ("_order");
  CREATE INDEX "posts_blocks_embed_parent_id_idx" ON "posts_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_embed_path_idx" ON "posts_blocks_embed" USING btree ("_path");
  CREATE INDEX "posts_cover_idx" ON "posts" USING btree ("cover_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_texts_order_parent" ON "posts_texts" USING btree ("order","parent_id");
  CREATE INDEX "posts_numbers_order_parent_idx" ON "posts_numbers" USING btree ("order","parent_id");
  CREATE INDEX "_posts_v_blocks_text_order_idx" ON "_posts_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_text_parent_id_idx" ON "_posts_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_text_path_idx" ON "_posts_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_gallery_images_order_idx" ON "_posts_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_images_parent_id_idx" ON "_posts_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_images_image_idx" ON "_posts_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_gallery_order_idx" ON "_posts_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_parent_id_idx" ON "_posts_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_path_idx" ON "_posts_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_video_order_idx" ON "_posts_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_video_parent_id_idx" ON "_posts_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_video_path_idx" ON "_posts_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_video_file_idx" ON "_posts_v_blocks_video" USING btree ("file_id");
  CREATE INDEX "_posts_v_blocks_stats_items_order_idx" ON "_posts_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_items_parent_id_idx" ON "_posts_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_order_idx" ON "_posts_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_parent_id_idx" ON "_posts_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_path_idx" ON "_posts_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_table_rows_order_idx" ON "_posts_v_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_table_rows_parent_id_idx" ON "_posts_v_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_table_order_idx" ON "_posts_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_table_parent_id_idx" ON "_posts_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_table_path_idx" ON "_posts_v_blocks_table" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_chart_points_order_idx" ON "_posts_v_blocks_chart_points" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_chart_points_parent_id_idx" ON "_posts_v_blocks_chart_points" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_chart_order_idx" ON "_posts_v_blocks_chart" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_chart_parent_id_idx" ON "_posts_v_blocks_chart" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_chart_path_idx" ON "_posts_v_blocks_chart" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_code_order_idx" ON "_posts_v_blocks_code" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_code_parent_id_idx" ON "_posts_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_code_path_idx" ON "_posts_v_blocks_code" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_hardware_items_order_idx" ON "_posts_v_blocks_hardware_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hardware_items_parent_id_idx" ON "_posts_v_blocks_hardware_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hardware_order_idx" ON "_posts_v_blocks_hardware" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hardware_parent_id_idx" ON "_posts_v_blocks_hardware" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hardware_path_idx" ON "_posts_v_blocks_hardware" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_embed_order_idx" ON "_posts_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_embed_parent_id_idx" ON "_posts_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_embed_path_idx" ON "_posts_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_cover_idx" ON "_posts_v" USING btree ("version_cover_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_texts_order_parent" ON "_posts_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_posts_v_numbers_order_parent_idx" ON "_posts_v_numbers" USING btree ("order","parent_id");
  CREATE INDEX "albums_photos_order_idx" ON "albums_photos" USING btree ("_order");
  CREATE INDEX "albums_photos_parent_id_idx" ON "albums_photos" USING btree ("_parent_id");
  CREATE INDEX "albums_photos_image_idx" ON "albums_photos" USING btree ("image_id");
  CREATE INDEX "albums_cover_idx" ON "albums" USING btree ("cover_id");
  CREATE UNIQUE INDEX "albums_slug_idx" ON "albums" USING btree ("slug");
  CREATE INDEX "albums_updated_at_idx" ON "albums" USING btree ("updated_at");
  CREATE INDEX "albums_created_at_idx" ON "albums" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_experience_id_idx" ON "payload_locked_documents_rels" USING btree ("experience_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_locked_documents_rels_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("activities_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_albums_id_idx" ON "payload_locked_documents_rels" USING btree ("albums_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_portrait_idx" ON "site_settings" USING btree ("portrait_id");
  CREATE INDEX "site_settings_resume_idx" ON "site_settings" USING btree ("resume_id");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_highlights" CASCADE;
  DROP TABLE "projects_links" CASCADE;
  DROP TABLE "projects_blocks_text" CASCADE;
  DROP TABLE "projects_blocks_gallery_images" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_video" CASCADE;
  DROP TABLE "projects_blocks_stats_items" CASCADE;
  DROP TABLE "projects_blocks_stats" CASCADE;
  DROP TABLE "projects_blocks_table_rows" CASCADE;
  DROP TABLE "projects_blocks_table" CASCADE;
  DROP TABLE "projects_blocks_chart_points" CASCADE;
  DROP TABLE "projects_blocks_chart" CASCADE;
  DROP TABLE "projects_blocks_code" CASCADE;
  DROP TABLE "projects_blocks_hardware_items" CASCADE;
  DROP TABLE "projects_blocks_hardware" CASCADE;
  DROP TABLE "projects_blocks_embed" CASCADE;
  DROP TABLE "projects_categories" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_texts" CASCADE;
  DROP TABLE "projects_numbers" CASCADE;
  DROP TABLE "_projects_v_version_highlights" CASCADE;
  DROP TABLE "_projects_v_version_links" CASCADE;
  DROP TABLE "_projects_v_blocks_text" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_video" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items" CASCADE;
  DROP TABLE "_projects_v_blocks_stats" CASCADE;
  DROP TABLE "_projects_v_blocks_table_rows" CASCADE;
  DROP TABLE "_projects_v_blocks_table" CASCADE;
  DROP TABLE "_projects_v_blocks_chart_points" CASCADE;
  DROP TABLE "_projects_v_blocks_chart" CASCADE;
  DROP TABLE "_projects_v_blocks_code" CASCADE;
  DROP TABLE "_projects_v_blocks_hardware_items" CASCADE;
  DROP TABLE "_projects_v_blocks_hardware" CASCADE;
  DROP TABLE "_projects_v_blocks_embed" CASCADE;
  DROP TABLE "_projects_v_version_categories" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_texts" CASCADE;
  DROP TABLE "_projects_v_numbers" CASCADE;
  DROP TABLE "experience_bullets" CASCADE;
  DROP TABLE "experience" CASCADE;
  DROP TABLE "experience_rels" CASCADE;
  DROP TABLE "publications_links" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "activities" CASCADE;
  DROP TABLE "posts_blocks_text" CASCADE;
  DROP TABLE "posts_blocks_gallery_images" CASCADE;
  DROP TABLE "posts_blocks_gallery" CASCADE;
  DROP TABLE "posts_blocks_video" CASCADE;
  DROP TABLE "posts_blocks_stats_items" CASCADE;
  DROP TABLE "posts_blocks_stats" CASCADE;
  DROP TABLE "posts_blocks_table_rows" CASCADE;
  DROP TABLE "posts_blocks_table" CASCADE;
  DROP TABLE "posts_blocks_chart_points" CASCADE;
  DROP TABLE "posts_blocks_chart" CASCADE;
  DROP TABLE "posts_blocks_code" CASCADE;
  DROP TABLE "posts_blocks_hardware_items" CASCADE;
  DROP TABLE "posts_blocks_hardware" CASCADE;
  DROP TABLE "posts_blocks_embed" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_texts" CASCADE;
  DROP TABLE "posts_numbers" CASCADE;
  DROP TABLE "_posts_v_blocks_text" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_video" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_items" CASCADE;
  DROP TABLE "_posts_v_blocks_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_table_rows" CASCADE;
  DROP TABLE "_posts_v_blocks_table" CASCADE;
  DROP TABLE "_posts_v_blocks_chart_points" CASCADE;
  DROP TABLE "_posts_v_blocks_chart" CASCADE;
  DROP TABLE "_posts_v_blocks_code" CASCADE;
  DROP TABLE "_posts_v_blocks_hardware_items" CASCADE;
  DROP TABLE "_posts_v_blocks_hardware" CASCADE;
  DROP TABLE "_posts_v_blocks_embed" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_texts" CASCADE;
  DROP TABLE "_posts_v_numbers" CASCADE;
  DROP TABLE "albums_photos" CASCADE;
  DROP TABLE "albums" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_projects_links_kind";
  DROP TYPE "public"."enum_projects_blocks_gallery_columns";
  DROP TYPE "public"."enum_projects_blocks_chart_kind";
  DROP TYPE "public"."enum_projects_categories";
  DROP TYPE "public"."enum_projects_stage";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_links_kind";
  DROP TYPE "public"."enum__projects_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__projects_v_blocks_chart_kind";
  DROP TYPE "public"."enum__projects_v_version_categories";
  DROP TYPE "public"."enum__projects_v_version_stage";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_experience_kind";
  DROP TYPE "public"."enum_publications_links_kind";
  DROP TYPE "public"."enum_publications_status";
  DROP TYPE "public"."enum_activities_kind";
  DROP TYPE "public"."enum_posts_blocks_gallery_columns";
  DROP TYPE "public"."enum_posts_blocks_chart_kind";
  DROP TYPE "public"."enum_posts_kind";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__posts_v_blocks_chart_kind";
  DROP TYPE "public"."enum__posts_v_version_kind";
  DROP TYPE "public"."enum__posts_v_version_status";`)
}
