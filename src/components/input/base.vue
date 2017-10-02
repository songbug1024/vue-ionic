<script>
  export default {
    props: {
      value: String,
      placeholder: String,
      readonly: Boolean,
      disabled: Boolean,
      autofocus: Boolean
    }
  }
</script>

<style lang="scss">
  @import "input";
  @import "input.ios";
</style>
