<?php
/*
Template Name: Upload Sound Template
*/

get_header(); // Include the default header

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Handle the form submission (you may need to adjust the handling code based on your setup)
    $upload_dir = wp_upload_dir();
    $upload_path = $upload_dir['path'] . '/';
    
    if (!empty($_FILES['mp3']['name'])) {
        $file = $_FILES['mp3'];
        $filename = basename($file['name']);
        $target_file = $upload_path . $filename;
        
        // Check file type
        $file_type = wp_check_filetype($filename);
        if ($file_type['ext'] === 'mp3') {
            // Move the uploaded file to the upload directory
            if (move_uploaded_file($file['tmp_name'], $target_file)) {
                $title = sanitize_text_field($_POST['title']);
                $description = sanitize_textarea_field($_POST['description']);
                $author = sanitize_text_field($_POST['author']);
                
                // Store form data or handle as needed
                // For example, you could save it to the database, send an email, etc.
                
                echo 'File successfully uploaded';
            } else {
                echo 'There was an error uploading the file.';
            }
        } else {
            echo 'Invalid file type. Only MP3 files are allowed.';
        }
    } else {
        echo 'No file selected.';
    }
}
?>

<h1>Upload Sound</h1>
<form action="" method="post" enctype="multipart/form-data">
    <?php wp_nonce_field('upload_sound_action', 'upload_sound_nonce'); ?>
    <label for="title">Sound Title:</label><br>
    <input type="text" id="title" name="title" required><br><br>
    
    <label for="description">Description:</label><br>
    <textarea id="description" name="description" rows="4" cols="50" required></textarea><br><br>
    
    <label for="author">Author:</label><br>
    <input type="text" id="author" name="author" required><br><br>
    
    <label for="mp3">Upload MP3:</label><br>
    <input type="file" id="mp3" name="mp3" accept=".mp3" required><br><br>
    
    <input type="submit" value="Upload">
</form>

<?php get_footer(); // Include the default footer
?>
