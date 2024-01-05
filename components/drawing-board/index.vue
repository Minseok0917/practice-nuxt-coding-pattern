<template>
  <div id="drawing-board" class="w-full h-full overflow-hidden"></div>
</template>
<script lang="ts" setup>
useDrawingCanvas("drawing-board");

function useDrawingCanvas(parentElementId: string) {
  onMounted(() => {
    const $parentElement = document.getElementById(parentElementId);
    if (!$parentElement) throw new Error("없어요");

    const $canvas = document.createElement("canvas");
    const context = $canvas.getContext("2d") as CanvasRenderingContext2D;

    $canvas.width = $parentElement.offsetWidth;
    $canvas.height = $parentElement.offsetHeight;
    window.addEventListener("resize", function () {
      $canvas.width = $parentElement.offsetWidth;
      $canvas.height = $parentElement.offsetHeight;
    });

    $parentElement.append($canvas);
  });
}
</script>
