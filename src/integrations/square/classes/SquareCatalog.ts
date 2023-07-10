import Square, { CatalogObject } from '..'

class SquareCatalog {
  constructor(private superThis: Square) {}

  async listCatalog() {
    return await this.superThis.client.catalogApi.listCatalog()
  }

  async listCatalogArranged() {
    const { result } = await this.listCatalog()
    const categories: CatalogObject[] = []
    const items: CatalogObject[] = []

    if (result && result.objects && result.objects.length) {
      for (const item of result.objects) {
        if (item.type === 'CATEGORY') categories.push(item)
        else if (item.type === 'ITEM') items.push(item)
      }
    }
    return { categories, items }
  }
}

export default SquareCatalog
