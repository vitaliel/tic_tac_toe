class GameChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    stream_from "game_#{params[:id]}"
  end

  def receive(data)
    ActionCable.server.broadcast("game_#{params[:id]}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
