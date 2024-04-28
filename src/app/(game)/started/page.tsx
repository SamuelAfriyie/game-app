"use client";
import { PageTitle } from "@/components/common/page_title";
import Spinner from "@/components/common/spinner";
import { GameEvent } from "@/components/gameui/game_event";
import { UseEvent } from "@/hooks/common/use_event";

export default function Started() {
  const { data, isLoading, isError } = UseEvent();
  console.log(data);
  return (
    <>
      <main className="flex  h-full w-full">
        <section className="w-full h-full rounded-sm p-4 bg-gray-100 mb-4 overflow-y-auto ">
          <PageTitle title="Events" />
          <p className="font-semibold">Cick on Event to start</p>
          <section className="h-fit w-full grid grid-rows space-y-4 justify-center py-3 ">
            {isLoading ? (
              <div className="flex justify-center items-center w-full">
                <Spinner />
              </div>
            ) : isError ? (
              <div>Error...</div>
            ) : (
              data.map((event: any) => <GameEvent {...event} attemptsLeft={event.campaign?.numOfAttempts} key={event?.id} />)
            )}
          </section>
        </section>
        <section className="h-full w-full flex flex-col items-center justify-center bg-white">
          <div>
            <p className="text-5xl font-bold">Kojo Manu</p>
            <p className="text-2xl font-semibold">kojo@example.com</p>
            <p className="text-2xl font-semibold">SHS</p>
          </div>
        </section>
      </main>
    </>
  );
}
