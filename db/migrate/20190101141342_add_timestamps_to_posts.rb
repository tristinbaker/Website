class AddTimestampsToPosts < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :posts, null: false
  end
end
