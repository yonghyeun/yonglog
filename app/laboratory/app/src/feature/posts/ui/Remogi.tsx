import { ReactionNum } from '@/global';
import { useAppDispatch } from '@/hooks';
import { reactingPost } from '../postSlice';

const reactionEmoji: Record<keyof ReactionNum, string> = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

type ReactionProps<T extends keyof ReactionNum> = {
  title: string;
  reaction: T;
  num: ReactionNum[T];
};

const RemogiButton = <T extends keyof ReactionNum>({
  reaction,
  num,
  title,
}: ReactionProps<T>) => {
  const dispatch = useAppDispatch();

  const handleReaction = () => {
    dispatch(reactingPost({ title, reaction }));
  };

  return (
    <button className='reaction' onClick={handleReaction}>
      {reactionEmoji[reaction]}
      {num}
    </button>
  );
};

export default RemogiButton;
