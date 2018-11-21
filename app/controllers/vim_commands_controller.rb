class VimCommandsController < ApplicationController

  def index 
    @commands = VimCommands.all
  end

end
