require 'rails_helper'

describe Games::Utils do
  subject { described_class.check_positions(input) }

  context 'when first horizontal line match' do
    let(:input) do
      %w(
      XXX
      ...
      ...
      ).join
    end

    it 'succeeds' do
      is_expected.to be_truthy
    end
  end

  context 'when last horizontal line match' do
    let(:input) do
      %w(
      ...
      ...
      OOO
      ).join
    end

    it 'succeeds' do
      is_expected.to be_truthy
    end
  end

  context 'when first vertical line match' do
    let(:input) do
      %w(
      X..
      X..
      X..
      ).join
    end

    it 'succeeds' do
      is_expected.to be_truthy
    end
  end

  context 'when last vertical line match' do
    let(:input) do
      %w(
      ..O
      ..O
      ..O
      ).join
    end

    it 'succeeds' do
      is_expected.to be_truthy
    end
  end

  context 'when first diagonal line match' do
    let(:input) do
      %w(
      X..
      .X.
      ..X
      ).join
    end

    it 'succeeds' do
      is_expected.to be_truthy
    end
  end

  context 'when second diagonal line match' do
    let(:input) do
      %w(
      ..O
      .O.
      O..
      ).join
    end

    it 'succeeds' do
      is_expected.to be_truthy
    end
  end

  context 'when game is in the middle' do
    let(:input) do
      %w(
      ..X
      .O.
      X..
      ).join
    end

    it 'succeeds' do
      is_expected.to eq false
    end
  end
end
