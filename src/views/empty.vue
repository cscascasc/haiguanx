

<script>
import { getbusinessType } from "@/api/dict/getdict";
export default {
  mounted() {
    getbusinessType()
      .then((res) => {
        console.log(res ,'ss');
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
