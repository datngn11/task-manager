<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class CardPopUpMixin extends Vue {
  showCardsPopUp = false;

  openCardsPopUp() {
    this.showCardsPopUp = true;
  }

  hideCardsPopUp() {
    this.showCardsPopUp = false;
  }
}
</script>
