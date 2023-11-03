import { getCanvasClient } from "@uniformdev/canvas-next-rsc";

export const getComponentById = async (compositionId: string) => {
  const canvasClient = getCanvasClient({
    revalidate: 60
  });

  const {
    composition: globalComponent,
  } = await canvasClient.getCompositionById({
    compositionId
  });

  return globalComponent;
}