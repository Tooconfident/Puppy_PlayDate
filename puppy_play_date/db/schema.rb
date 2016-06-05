# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160604000908) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dogs", force: :cascade do |t|
    t.string   "name"
    t.string   "breed"
    t.integer  "age"
    t.string   "toy"
    t.text     "description"
    t.string   "gender"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "dogs", ["user_id"], name: "index_dogs_on_user_id", using: :btree

  create_table "memberships", force: :cascade do |t|
    t.integer  "dog_id"
    t.integer  "playdate_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "memberships", ["dog_id"], name: "index_memberships_on_dog_id", using: :btree
  add_index "memberships", ["playdate_id"], name: "index_memberships_on_playdate_id", using: :btree

  create_table "photos", force: :cascade do |t|
    t.integer  "dog_id"
    t.string   "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "photos", ["dog_id"], name: "index_photos_on_dog_id", using: :btree

  create_table "playdates", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "location"
    t.string   "frequency"
    t.string   "time_day"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "playdates", ["user_id"], name: "index_playdates_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "name"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "dogs", "users"
  add_foreign_key "memberships", "dogs"
  add_foreign_key "memberships", "playdates"
  add_foreign_key "photos", "dogs"
  add_foreign_key "playdates", "users"
end
