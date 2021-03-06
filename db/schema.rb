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

ActiveRecord::Schema.define(version: 2018_11_21_221444) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "vim_commands", force: :cascade do |t|
    t.string "command"
    t.string "description"
    t.integer "weight"
    t.bigint "vim_type_id"
    t.string "hidden_attributes"
    t.index ["vim_type_id"], name: "index_vim_commands_on_vim_type_id"
  end

  create_table "vim_types", force: :cascade do |t|
    t.string "name"
    t.string "classifier"
  end

  create_table "vimrcs", force: :cascade do |t|
    t.string "function"
    t.bigint "vim_type_id"
    t.string "comments"
    t.string "icon"
    t.index ["vim_type_id"], name: "index_vimrcs_on_vim_type_id"
  end

  add_foreign_key "vim_commands", "vim_types"
  add_foreign_key "vimrcs", "vim_types"
end
