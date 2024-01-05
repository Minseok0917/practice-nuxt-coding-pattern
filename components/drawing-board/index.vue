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

    class Position {
      x: number;
      y: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }
    }

    const state: {
      zoom: number;
      pageX: number;
      pageY: number;
      position: Position | null;
    } = {
      zoom: 0,
      pageX: 0,
      pageY: 0,
      position: null,
    };

    $canvas.width = $parentElement.offsetWidth;
    $canvas.height = $parentElement.offsetHeight;
    window.addEventListener("resize", function () {
      $canvas.width = $parentElement.offsetWidth;
      $canvas.height = $parentElement.offsetHeight;
    });

    $canvas.addEventListener("mousedown", function (event) {
      const [x, y] = [event.offsetX, event.offsetY];
      state.position = new Position(x, y);
    });
    $canvas.addEventListener("mousemove", function (event) {
      if (!state.position) return;

      const [x, y] = [event.offsetX, event.offsetY];
      state.pageX += x - state.position.x;
      state.pageY += y - state.position.y;
      state.position.x = x;
      state.position.y = y;
      rendering();
    });
    $canvas.addEventListener("mouseup", function () {
      if (!state.position) return;
      state.position = null;
      rendering();
    });

    function rendering() {
      context.clearRect(0, 0, $canvas.width, $canvas.height);
      // const shapes = [{ pageX: 100, pageY: 200, width: 200, height: 200, fill: "red", type: "rect" }];
      context.beginPath();
      context.rect(state.pageX - 100, state.pageY - 200, 200, 200);
      context.fillStyle = "red";
      context.fill();
    }

    $parentElement.append($canvas);
  });
}
</script>
