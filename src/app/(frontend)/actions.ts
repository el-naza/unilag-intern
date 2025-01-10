'use server'

export async function uploadFiles(formData: FormData) {
  try {
    const files = formData.getAll('files')

    // Validate files
    for (const file of files) {
      if (file instanceof File) {
        // Check file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Maximum size is 2MB`)
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/zip']
        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            `File ${file.name} has unsupported format. Allowed formats are jpg, png, svg, and zip`,
          )
        }
      }
    }

    // Here you would typically upload the files to your storage solution
    // For this example, we'll just return success
    return { success: true, message: 'Files uploaded successfully' }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload files',
    }
  }
}
