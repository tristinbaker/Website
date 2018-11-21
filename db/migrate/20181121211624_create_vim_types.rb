class CreateVimTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :vim_types do |t|
      t.string :name
      t.string :classifier
    end
  end
end
