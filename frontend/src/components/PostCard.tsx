import React, { useState } from "react";
import Subtitle from "./atoms/Subtitle";
import Paragraf from "./atoms/Paragraf";
import { Title } from "./atoms/Title";
import Image from "./atoms/Image";
import { Posts } from "../routes/profile";
import { Button } from "./atoms/Button";
import ContactModal from "./ContactModal";


type Props = {
  posts: Posts[] | undefined;
};

export default function PostCard({ posts }: Props) {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleShowModal = () => {
    if (showContactModal) {
      setShowContactModal(false);
    } else setShowContactModal(true);
  };

  const user = posts?.map((post: Posts) => post.user);

  return (
    <>
      <div className="flex overflow-x-auto space-x-4">
        {posts &&
          posts.map((post: Posts, index: number) => (
            <React.Fragment key={index}>
              <div className="flex flex-col min-w-[280px] h-full space-x border  border-accent-grey w-full rounded-md">
                <div className="flex flex-col gap-2 border border-accent bg-gray-50 rounded-sm p-3">
                  <div className="flex w-full gap-4 ">
                    <Image className="aspect-square object-cover w-[15%] rounded-xl border-2 border-white shadow-md" />
                    <div>
                      <Title variant="red" title={post.ensemble.title} />
                      <div className="flex gap-4">
                        <Paragraf
                          variant="body"
                          className="font-bold"
                          paragrafText={post.ensemble.city}
                        />
                        <Paragraf
                          variant="body"
                          paragrafText={`${post.ensemble.activeUsers.length} musikkere`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-4 h-[150px] justify-between">
                  <Subtitle variant="cardTitle" subtitle={post.title} />
                  <div className="flex justify-between">
                    <Subtitle
                      variant="instrument"
                      subtitle={post.instrument.name}
                    />
                    <Button
                      buttonText="Kontakt"
                      variant="primary"
                      size="small"
                      onClick={handleShowModal}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
      {showContactModal && (
  <>
    {user && user.map((user: any, index: number) => (
      <ContactModal key={index} showContactModal={showContactModal} handleShowModal={handleShowModal} user={user} />
    ))}
  </>
)}
    </>
  );
}
