Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :users, only: [] do
      collection do
        post :login
        get :me
      end
    end

    resources :games, only: [:create, :show, :index] do
      member do
        put :join
        put :make_move
      end
    end
  end

  root to: 'pages#index'

  # Pass any path to react
  get '/*path' => 'pages#index'
end
