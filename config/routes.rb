Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'

  resources :vim_commands, only: :index
  resources :vimrcs

  resources :smart_rockets, only: :index
  resources :cubewaves, only: :index

  resources :posts
end
