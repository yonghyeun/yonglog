import { LoadingTitle, LoadingContent } from "@/components/Loading";

const PostLoading = () => (
  <>
    <header className="pt-14 mb-12">
      <LoadingTitle />
    </header>
    <main className="px-14">
      <LoadingContent />
    </main>
  </>
);

export default PostLoading;
