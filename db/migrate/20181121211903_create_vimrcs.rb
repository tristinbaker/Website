class CreateVimrcs < ActiveRecord::Migration[5.2]
  def change
    create_table :vimrcs do |t|
      t.string :function
      t.references :vim_type, foreign_key: true
      t.string :comments
      t.string :icon
    end
  end
end
