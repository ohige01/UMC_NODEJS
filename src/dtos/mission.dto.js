//StoreMissionGet Response Dto
export const responseFromMissions = (missions) => {
    return {
        data: missions,
        pagination: {
        //마지막으로 읽은 missionId 반환
        cursor: missions.length ? missions[missions.length - 1].id : null,
        },
    };
};