class VimrcsController < ApplicationController
  
  before_action :set_vim_types

  def index; end

  def show; end

  def new; end

  def create; end

  def edit; end

  def update; end

  def destroy; end

  private

  def set_vim_types
    @vim_types = VimType.exclude_non_vimrc.eager_load(:vimrcs)
  end

end
