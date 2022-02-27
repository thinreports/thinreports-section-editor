<template>
  <MenuDropdownSubTree :title="$t('toolbar.group.file')">
    <MenuDropdownButton
      :text="$t('toolbar.file.new')"
      icon="mdi mdi-file-document-outline"
      @click="newReport"
    />
    <MenuDropdownButton
      :text="$t('toolbar.file.save')"
      icon="mdi mdi-content-save-outline"
      @click="save"
    />
    <MenuDropdownButton
      :text="$t('toolbar.file.open')"
      icon="mdi mdi-folder-open-outline"
      @click="open"
    />
  </MenuDropdownSubTree>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Ajv from 'ajv';
import UIkit from 'uikit';
import { report, root, metadata } from '../../store';
import MenuDropdownButton from './MenuDropdownButton.vue';
import MenuDropdownSubTree from './MenuDropdownSubTree.vue';
import layoutJsonSchema from '@/store/lib/layout-schema/schema.json';

const { electronAPI } = window;

export default defineComponent({
  components: {
    MenuDropdownSubTree,
    MenuDropdownButton
  },
  setup () {
    const newReport = () => {
      location.reload();
    };
    const save = async () => {
      const schema = report.getters.toSchemaJSON();

      if (!validateSchema(schema)) return;

      const currentFilename = metadata.getters.filename();

      if (currentFilename === null) {
        const filename = await electronAPI.saveSchemaFileAs(schema);
        if (filename) {
          root.actions.saveSchema(filename);
        }
      } else {
        await electronAPI.saveSchemaFile(schema, currentFilename);
        root.actions.saveSchema();
      }
    };
    const open = async () => {
      const file = await electronAPI.openSchemaFile();

      if (file) {
        root.actions.loadSchema(file.schema, file.filename);
      }
    };
    const validateSchema = (jsonString: string): boolean => {
      const ajv = new Ajv({
        multipleOfPrecision: 3
      });

      if (!ajv.validate(layoutJsonSchema, JSON.parse(jsonString))) {
        /* eslint-disable no-console */
        console.log('Schema:', jsonString);
        console.log('Errors:', JSON.stringify(ajv.errors, null, '   '));
        /* eslint-enable no-console */

        UIkit.notification({
          message: 'Oops! Some error has occurred. (Please show console log)',
          status: 'danger',
          timeout: 10000
        });

        return false;
      }

      return true;
    };

    return {
      newReport,
      save,
      open
    };
  }
});
</script>
