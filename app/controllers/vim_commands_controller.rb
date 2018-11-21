class VimCommandsController < ApplicationController

  def index 
    @commands = VimCommand.all
  end

end
