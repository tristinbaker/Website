class CreateVimCommands < ActiveRecord::Migration[5.2]
  def change
    create_table :vim_commands do |t|
      t.string :command
      t.string :description
    end
  end
end
