class VimrcsController < ApplicationController

  layout 'welcome'
  
  before_action :set_vim_types

  def index; end

  def show
    @vimrc = Vimrc.find(params[:id])
  end

  def new
    @vimrc = Vimrc.new
  end

  def create
    @vimrc = Vimrc.new(vimrc_params)
    if @vimrc.save
      redirect_to vimrcs_path
    else
      redirect_to vim_commands_path
    end
  end

  def edit; end

  def update; end

  def destroy; end

  private

  def set_vim_types
    @vim_types = VimType.exclude_non_vimrc.eager_load(:vimrcs)
  end

  def vimrc_params
    params.require(:vimrc).permit(:function, :comments, :vim_type_id)
  end

end
