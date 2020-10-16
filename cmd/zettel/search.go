package main

import (
	"fmt"
	"path"
	"strings"

	"github.com/hackstream/zettel/internal/pipeline"
)

// PostData holds the data of a Post. Used for Indexing in Search
type PostData struct {
	Title     string   `json:"title"`
	Permalink string   `json:"permalink"`
	Tags      []string `json:"tags"`
}

// GenerateSearchIndex creates a index file for search functionality
func GenerateSearchIndex(posts []pipeline.Post) []PostData {
	indexData := make([]PostData, 0)
	for _, post := range posts {
		slug := strings.TrimSuffix(path.Base(post.FilePath), ".md")
		genPost := PostData{
			Title:     post.Meta.Title,
			Tags:      post.Meta.Tags,
			Permalink: fmt.Sprintf("posts/%s.html", slug),
		}
		indexData = append(indexData, genPost)
	}
	return indexData
}
