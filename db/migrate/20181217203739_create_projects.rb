class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :route
      t.string :image
      t.string :description
    end
  end
end
