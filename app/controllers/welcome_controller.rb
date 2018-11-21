class WelcomeController < ApplicationController

  def index
    @vim_commands = VimCommands.all
  end

end
