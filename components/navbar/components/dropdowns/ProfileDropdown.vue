 <template>
  <div class="profile-dropdown-wrapper">
    <VaDropdown v-model="isShown" :offset="[9, 0]" class="profile-dropdown" stick-to-edges>
      <template #anchor>
        <VaButton preset="secondary" color="textPrimary">
          <span class="profile-dropdown__anchor min-w-max">
            <slot />
            <VaAvatar :size="32" color="warning"> <font-awesome-icon :icon="['fas', 'user-tie']" /> </VaAvatar>
          </span>
        </VaButton>
      </template>
      <VaDropdownContent
        class="profile-dropdown__content md:w-60 px-0 py-4 w-full"
        :style="{ '--hover-color': hoverColor }"
      >
        <!-- <VaList v-for="group in options" :key="group.name">
          <header v-if="group.name" class="uppercase text-[var(--va-secondary)] opacity-80 font-bold text-xs px-4">
            {{ group.name }}
          </header>
          <VaListItem
            v-for="item in group.list"
            :key="item.name"
            class="menu-item px-4 text-base text-left cursor-pointer h-8"
            v-bind="resolveLinkAttribute(item)"
          >

            {{ item.name }}
          </VaListItem>

          <VaListSeparator v-if="group.separator" class="mx-3 my-2" />
        </VaList> -->

        <VaList>
          <header  class="uppercase text-[var(--va-secondary)] opacity-80 font-bold text-xs px-4">
          Acount
          </header>
          <VaListItem   class="menu-item px-4 text-base text-left cursor-pointer h-8">

           <button @click="store.logout()">Logout</button>
          </VaListItem>
        </VaList>
      </VaDropdownContent>
    </VaDropdown>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useColors } from 'vuestic-ui'
import { useAuthStore } from "~/stores/useAuth";


const store = useAuthStore();

const { colors, setHSLAColor } = useColors()
const hoverColor = computed(() => setHSLAColor(colors.focus, { a: 0.1 }))

const { t } = useI18n()


  


const isShown = ref(false)


</script>

<style lang="scss">
.profile-dropdown {
  cursor: pointer;

  &__content {
    .menu-item:hover {
      background: var(--hover-color);
    }
  }

  &__anchor {
    display: inline-block;
  }
}
</style> 



