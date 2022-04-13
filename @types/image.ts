export interface ISingleImage {
  fields: {
    photo: {
      fields: {
        file: {
          url: string
          details: {
            image: {
              width: number;
              height: number;
            }
          }
        }
      }
    },
    title: string
  }
}