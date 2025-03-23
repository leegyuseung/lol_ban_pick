//소켓 연결 페이지
'use client';
import React from 'react';
import useBanpickSocket from '@/hooks/useBanpickSocket';
import { useRulesStore, useSocketStore, useUserStore } from '@/store';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { withNavigationGuard } from '@/hoc/routerGuard';

function BanpickSocket({ userId: _userId }: { userId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  //room id
  const { roomId, setRoomId } = useSocketStore();
  //user id
  const { userId, setUserId } = useUserStore();
  const { ws, setWs, emitFunc } = useSocketStore();
  const { banpickMode, peopleMode, timeUnlimited, nowSet, position, role, hostInfo, guestInfo } = useRulesStore();

  useBanpickSocket({ userId: _userId, roomId, isHost: false });

  const onReady = () => {
    //현재 설정된 게임의 룰 을 전송
    emitFunc(() => {
      console.log('테스트');
    }, 'PARM');
  };

  const goEnter = () => {
    router.push('/banpickTeam');
    emitFunc(
      () =>
        ws?.send(
          JSON.stringify({
            type: 'start',
            userId: userId,
            roomId: roomId,
            host: !!searchParams!.get('roomId'),
          }),
        ),
      'blue',
    );
  };

  return (
    <>
      {true ? (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">대기방</h1>

          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
            {/* 레드팀 */}
            <div className="bg-red-700 p-6 rounded-lg shadow-lg border-2 border-red-500">
              <h2 className="text-xl font-semibold">레드팀 (1/1)</h2>
              <p className="mt-2 text-sm text-gray-300">플레이어 1</p>
            </div>

            {/* 관전자 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-gray-600">
              <h2 className="text-xl font-semibold">관전자 (무제한)</h2>
              <p className="mt-2 text-sm text-gray-300">현재 접속자: 3명</p>
            </div>

            {/* 블루팀 */}
            <div className="bg-blue-700 p-6 rounded-lg shadow-lg border-2 border-blue-500">
              <h2 className="text-xl font-semibold">블루팀 (1/1)</h2>
              <p className="mt-2 text-sm text-gray-300">플레이어 2</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">게임이 곧 시작됩니다...</p>
          </div>
        </div>
      ) : (
        <>
          <div>공유하기 roomId</div>
          <a
            href={`http://${process.env.NEXT_PUBLIC_SITE_URL}:3000/socketTest?roomId=${roomId}`}
            target="_blank"
            rel="noreferrer"
          >{`http://${process.env.NEXT_PUBLIC_SITE_URL}:3000/socketTest?roomId=${roomId}`}</a>
          <br />
          <br />
          <br />
          <div>banpickMode{banpickMode}</div>
          <div>peopleMode{peopleMode}</div> <div>timeUnlimited {timeUnlimited}</div>
          <div>nowSet {nowSet}</div>
          <div>position {position}</div>
          <div>role {role}</div>
          <div>hostInfo : {JSON.stringify(hostInfo)}</div>
          <div>guestInfo : {JSON.stringify(guestInfo)}</div>
          userId
          {userId ? <div>{userId}</div> : <></>}
          roomId
          {roomId ? <div>{roomId}</div> : <></>}
          <button onClick={onReady}>준비하기</button>
          <button onClick={goEnter}>시작하기</button>
        </>
      )}
    </>
  );
}

export default withNavigationGuard(BanpickSocket, () => true);
