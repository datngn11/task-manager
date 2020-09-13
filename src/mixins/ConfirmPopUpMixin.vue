<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ConfirmPopUpMixin extends Vue {
  showConfirmPopUp = false;

  openConfirmPopUp() {
    this.showConfirmPopUp = true;
  }
  hideConfirmPopUp() {
    this.showConfirmPopUp = false;
  }
}
</script>
