class AddWeightToVimCommands < ActiveRecord::Migration[5.2]
  def change
    add_column :vim_commands, :weight, :integer
  end
end
