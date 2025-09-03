# frozen_string_literal: true

Rails.application.routes.draw do
  get  "sign_in", to: "sessions#new", as: :sign_in
  post "sign_in", to: "sessions#create"
  get  "sign_up", to: "users#new", as: :sign_up
  post "sign_up", to: "users#create"

  resources :sessions, only: [:destroy]
  resource :users, only: [:destroy]

  namespace :admin do
    resources :users, only: [:index, :destroy]
    namespace :configurations do
      resources :countries
      resources :institutes
      resources :courses
    end
  end

  namespace :identity do
    resource :email_verification, only: [:show, :create]
    resource :password_reset,     only: [:new, :edit, :create, :update]
  end

  get :dashboard, to: "dashboard#index"
  get :about, to: "about#index"

  namespace :settings do
    resource :profile, only: [:show, :update]
    resource :password, only: [:show, :update]
    resource :email, only: [:show, :update]
    resources :sessions, only: [:index]
    inertia :appearance
  end

  root "home#index"

  get "up" => "rails/health#show", as: :rails_health_check
end
