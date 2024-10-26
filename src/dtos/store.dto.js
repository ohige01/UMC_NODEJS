//AddStore Request Dto
export const bodyToStore = (body) => {

    return {
        name: body.name,
        category: body.category,
        location: body.location,
        infoImg: body.infoImg
    };
  };